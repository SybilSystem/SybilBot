#!/bin/bash

clear

# Checking for Root Permissions
check_your_privilege () {
    if [[ "$(id -u)" != 0 ]]; then
        echo -e "\e[91mError: This setup script requires root permissions. Please run the script as root.\e[0m" > /dev/stderr
        exit 1
    fi
}

check_your_privilege

#Updating System
echo -ne ""
sudo apt-get -y update >/dev/null && sudo apt-get -y upgrade >/dev/null
echo -e ""

#Ask to install NPM, node-gyp and install dependencies
echo
sudo apt-get update && sudo apt-get install node
echo

echo
