packer {
  required_plugins {
    amazon = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "debian" {
  ami_name      = "Ami_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  source_ami    = "ami-06db4d78cb1d3bbf9" # Replace with the correct Debian 12 AMI ID
  instance_type = "t2.micro"
  region        = "us-east-1"
  profile       = "dev"
  ssh_username  = "admin"
  ami_users = [
    "730146561444",
    "933464024683",
  ]
}

build {
  sources = [
    "source.amazon-ebs.debian"
  ]
  provisioner "shell" {
    scripts = [
      "./setup.sh",
    ]
  }
}

