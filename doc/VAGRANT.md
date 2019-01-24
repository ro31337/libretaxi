# Vagrant

You can use [Vagrant](https://www.vagrantup.com/) for your local development without installing
Node and Redis on your machine.

# Installation

To install Vagrant you can follow [Getting Started](https://www.vagrantup.com/intro/getting-started/index.html)
instructions.

# Usage

After you have installed Vagrant you can just `cd` into the project directory
```bash
cd libertaxi
```

To install and run your virtual machin run
```bash
vagrant up
```

After this you can ssh into your VM by calling
```bash
vagrant ssh
```

The project will be in the `/vagrant` directory
```bash
cd /vagrant
```

After that you can use all needed commands described in
[Getting Started](GETTING-STARTED.md) section.


