#!/bin/sh
#
# Lazy deploy script.
# Author: Roman Pushkin
#
# 1. Attach to remote hostname and execute ~/redeploy-libretaxi.sh (see below):
# 2. Kill all "node" processes with args containing "libretaxi".
#    Sends SIGTERM, which is handled by application, so it's OK to kill app this way.
# 3. Sleep for 5 seconds
# 4. Kill tmux session if any
# 5. Sleep for 1 second
# 6. Create new tmux session with the following commands:
#    a) change to project directory (~/work/libretaxi)
#    b) git pull
#    c) npm install
#    d) npm run build-production
#    e) npm run telegram-production (also re-start on crash)
# 7. Show "OK deployed message" if everything's OK (you may see some tmux warnings though).
#
# Attach to tmux on your host: tmux attach
# Detach from the session: Ctrl+b, d
#
# ~/redeploy-libretaxi.sh:
# #!/bin/bash
# (pkill -f "node.*libretaxi" | true) && sleep 5 && (tmux kill-session -t "bot" | true) && sleep 1 && tmux new-session -s "bot" -n "Prod-bot" -d "cd ~/work/libretaxi/ && git pull && npm i && npm run build-production && (while true;do npm run telegram-production;done);bash" && echo OK deployed
#
ssh ro@libretaxi.org -t "~/redeploy-libretaxi.sh"
