#!/bin/bash

#1.On online Ubuntu 22.04, create a folder, save this script as download_build_essential.sh
#2.Make script executable with chmod +x download_build_essential.sh
#3.Run script with ./download_build_essential.sh
#4.Copy downladed .deb files (~76MB) to the offline Ubuntu 22.04
#5.On offline Ubuntu, run sudo dpkg -i *.deb
#6.Verify installation with make --version

# Function to download a package and its dependencies
download_package() {
    package=$1

    # Check if the package has already been processed
    if grep -Fxq "$package" downloaded_packages.txt
    then
        echo "Already downloaded: $package"
        return
    else
        echo "$package" >> downloaded_packages.txt
    fi

    echo "Downloading $package..."
    apt-get download $package

    for dep in $(apt-cache depends $package | grep Depends: | sed "s/  Depends://"); do
        # Avoid downloading virtual packages
        if apt-cache show $dep > /dev/null 2>&1; then
            download_package $dep
        fi
    done
}

# Main package to download
main_package="build-essential"

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Create a directory for downloads
download_dir=$main_package
mkdir -p $download_dir
cd $download_dir

# File to keep track of downloaded packages
touch downloaded_packages.txt

# Download main package and dependencies
download_package $main_package

echo "Download completed. Files saved in $download_dir."
