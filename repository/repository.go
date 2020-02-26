package repository

import (
	"database/sql"
	"libretaxi/objects"
	"log"
)

type Repository struct {
	db *sql.DB
}

func (repo *Repository) FindUser(userId int64) *objects.User {
	user := &objects.User{}

	err := repo.db.QueryRow(`select "userId", "menuId", "username", "firstName", "lastName", "lon", "lat", "languageCode", "reportCnt", "shadowBanned" from users where "userId" = $1 limit 1`,
		userId).Scan(&user.UserId, &user.MenuId, &user.Username, &user.FirstName, &user.LastName, &user.Lon, &user.Lat, &user.LanguageCode, &user.ReportCnt, &user.ShadowBanned)

	if err != nil {
		log.Println(err)
		return nil
	}

	return user
}

func (repo *Repository) SaveUser(user *objects.User) {
	// Upsert syntax: https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
	// Geo populate syntax: https://gis.stackexchange.com/questions/145007/creating-geometry-from-lat-lon-in-table-using-postgis/145009
	result, err := repo.db.Query(`INSERT INTO users ("userId", "menuId", "username", "firstName", "lastName", "lon", "lat", "geog", "languageCode", "reportCnt", "shadowBanned")
		VALUES ($1, $2, $3, $4, $5, $6, $7, ST_SetSRID(ST_MakePoint($7, $6), 4326), $8, $9, $10)
		ON CONFLICT ("userId") DO UPDATE
		  SET "menuId" = $2,
		      "username" = $3,
		      "firstName" = $4,
		      "lastName" = $5,
		      "lon" = $6,
		      "lat" = $7,
		      "languageCode" = $8,
		      "reportCnt" = $9,
		      "shadowBanned" = $10,
		      "geog" = ST_SetSRID(ST_MakePoint($6, $7), 4326)
		  `, user.UserId, user.MenuId, user.Username, user.FirstName, user.LastName, user.Lon, user.Lat, user.LanguageCode, user.ReportCnt, user.ShadowBanned)
	defer result.Close()

	if err != nil {
		log.Println(err)
	} else {
		log.Println("User saved")
	}
}

func (repo *Repository) FindPost(postId int64) *objects.Post {
	post := &objects.Post{}

	err := repo.db.QueryRow(`select "postId", "userId", "text", "lon", "lat", "reportCnt" from posts where "postId" = $1 limit 1`,
		postId).Scan(&post.PostId, &post.UserId, &post.Text, &post.Lon, &post.Lat, &post.ReportCnt)

	if err != nil {
		log.Println(err)
		return nil
	}

	return post
}

func (repo *Repository) SavePost(post *objects.Post) {
	err := repo.db.QueryRow(`INSERT INTO posts ("userId", "text", "lon", "lat", "geog", "reportCnt")
		VALUES ($1, $2, $3, $4, ST_SetSRID(ST_MakePoint($3, $4), 4326), $5)
		ON CONFLICT ("postId") DO UPDATE
			SET "userId" = $1,
			    "text" = $2,
			    "lon" = $3,
			    "lat" = $4,
			    "geog" = ST_SetSRID(ST_MakePoint($3, $4), 4326),
			    "reportCnt" = $5
		RETURNING "postId"`,
		post.UserId, post.Text, post.Lat, post.Lon, post.ReportCnt).Scan(&post.PostId)

	if err != nil {
		log.Println(err)
	} else {
		log.Println("Post saved")
	}
}

func (repo *Repository) UserIdsAround(lon float64, lat float64) (userIds []int64) {
	// select "userId", ST_Distance(c.x, "geog") AS distance from users, (SELECT ST_MakePoint(-122.415561, 37.633141)::geography) as c(x) where ST_DWithin(c.x, "geog", 25000)
	result, err := repo.db.Query(`select "userId" from users, (SELECT ST_MakePoint($1, $2)::geography) as c(x) where ST_DWithin(c.x, "geog", 25000)`,
		lon, lat)
	defer result.Close()

	if err != nil {
		log.Println(err)
		return nil
	}

	for result.Next() {
		var userId int64
		err := result.Scan(&userId)
		if err != nil {
			log.Println("Error getting userId")
		} else {
			userIds = append(userIds, userId)
		}
	}
	log.Printf("Found %d users around\n", len(userIds))
	return userIds
}

func (repo *Repository) UserPostedRecently(userId int64) bool {
	count := 0
	err := repo.db.QueryRow(`select count("postId") from posts where "userId" = $1 and "createdAtUtc" >= (now() at time zone 'utc') - interval '5 minutes'`, userId).Scan(&count)
	if err != nil {
		log.Println("Error getting the number of recent posts")
	}
	return count != 0
}

func (repo *Repository) ShowCallout(userId int64, featureName string) bool {
	count := 0
	err := repo.db.QueryRow(`select count("id") from dismissed_feature_callouts where "userId" = $1 and "featureName" = $2`, userId, featureName).Scan(&count)
	if err != nil {
		log.Println("Error while querying dismissed feature callouts")
	}
	return count == 0
}

func (repo *Repository) DismissCallout(userId int64, featureName string) {
	_, err := repo.db.Exec(`insert into dismissed_feature_callouts ("userId", "featureName") values ($1, $2) on conflict ("userId", "featureName") do nothing`, userId, featureName);
	if err != nil {
		log.Printf("Error while dismissing feature callout %s for user %d: %s", featureName, userId)
		log.Println(err)
	}
}

func NewRepository(db *sql.DB) *Repository {
	repo := &Repository{db: db}
	return repo
}