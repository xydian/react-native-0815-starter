import os
from distutils.spawn import find_executable
from enum import Enum


class Platform(Enum):
    MAC_INTEL = 1
    MAC_SILICON = 2
    LINUX = 3
    WINDOWS = 4


def print_step(step_number: int, step: str):
    print("\n##############################################\n")
    print("Step {}: {}\n".format(step_number, step))


if __name__ == "__main__":
    gcloud = "gcloud"
    expo = "expo-cli"
    yarn = "yarn"
    git = "git"

    print_step(1, "Base setup")
    print("Checking prerequisites...")
    if find_executable(gcloud) is None:
        print("Error: Google Cloud SDK doesn't seem to be installed, please install (command gcloud not found in PATH)")
        quit()

    if find_executable(expo) is None:
        print("Error: Expo cli doesn't seem to be installed, please install (command expo-cli not found in PATH)")
        quit()

    if find_executable(yarn) is None:
        print("Error: Yarn package manager doesn't seem to be installed, please install (command yarn not found in PATH)")
        quit()

    if find_executable(git) is None:
        print("Error: Git doesn't seem to be installed, please install (command git not found in PATH)")
        quit()

    print("All dependencies seem to be installed correctly, we now proceed with creating the project on google cloud")

    print_step(2, "Google Cloud")

    print("We assume that you are hosting the repo on github and have write access to the current remote url")
    print("The current remote url of this git repository is: \n")
    os.system("git config --get remote.origin.url")
    confirmation = input("\nAre you sure you have write access to this repository? (yes/no): ")
    if confirmation != "yes":
        print("Please make sure to set a remote url that you have write access to, we need this in order to get CI/CD for automatic deployment runnning")
        quit()

    print("\nChoose your platform:")
    print("[1] Mac Os (Intel)")
    print("[2] Mac Os (Apple Silicon)")
    print("[3] Linux")
    print("[4] Windows (this is untested and discouraged)")

    platform_number = None

    while True:
        platform = input("\nPlease type in the number of your plaform: ")

        try:
            platform_number = int(platform)

            if platform_number < 1 or platform_number > 4:
                print("The specified number is not within the accepted range (1 - 4")
                continue

            break
        except ValueError:
            print("You didn't type in a number")

    print("\nThe active gcloud account will be listed, please confirm that this is the Google Cloud Account you want to use to create the project in\n")
    os.system("gcloud config  get-value account")
    confirmation = None
    while confirmation != "yes" and confirmation != "no":
        if confirmation is not None:
            print("Please type in either 'yes' or 'no'")
        confirmation = input("\nIs this the account you want to use? (yes/no): ")
    if confirmation != "yes":
        print("You did not type in 'yes' so we cancelled the creation. Please set the appropriate account you want to use using the following command")
        print("gcloud config set account <accountemailaddress>")
        print("After that you can run the script again")
        quit()

    project_id = input("\nEnter new project id (must be unique across google cloud): ")
    project_name = input("\nEnter project name: ")

    print("\nCreating project on google cloud...")
    project_creation = os.system("gcloud projects create {} --name={}".format(project_id, project_name))
    if project_creation != 0:
        print("Error creating project on google cloud platform. Exiting...")
        quit()

    print("Setting active project to the newly created project...")
    os.system("gcloud config set project {}".format(project_id))

    print("Creating service account on new project for deployment using github actions...")
    service_account_name = "{}-sa-github-actions".format(project_id[0:10])
    service_account_creation = os.system("gcloud iam service-accounts create {} --display-name=\"{} service account\"".format(service_account_name, project_name))
    if service_account_creation != 0:
        print("Error creating service account on project. Exiting...")
        quit()

    print("Enabling API for mysql on google cloud")
    mysql_api_enablement = os.system("gcloud services enable sqladmin.googleapis.com")

    mysql_instance_name = "{}-mysql".format(project_id)
    print("Creating mysql instance on google cloud ...")
    os.system("gcloud sql instances create {}".format(mysql_instance_name))

    print("Downloading google cloud proxy for local connecting to database...")
    if platform_number == 1 or platform_number == 2:
        os.system("curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64")
    if platform_number == 3:
        os.system("curl -o cloud_sql_proxy wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy")
    if platform_number == 4:
        print("Please download the cloud sql proxy manually at: https://cloud.google.com/sql/docs/mysql/sql-proxy#windows-64-bit")

    os.system("chmod +x cloud_sql_proxy")
    print("Cloud SQL Proxy has been downloaded, for manual development you can connect to the proxy using the following command:")
    print("cloud_sql_proxy -instances=${project_id}:${us-central1-f}:${postgres_instance_name}=tcp:3306")

    print_step(3, "Expo")
    print("Please sign in to your account on expo.dev")
    os.system("{} login".format(expo))

    print("Please create a new access token on https://expo.dev/settings/access-tokens")
    expo_access_token = input("Paste your obtained access token here: ")

    print("Alright, we are mostly done. You now have to manually configure the following secrets in github")
    print("See: https://docs.github.com/en/actions/security-guides/encrypted-secrets on how to add secrets to your github repo")

    print("EXPO_TOKEN={}".format(expo_access_token))
    print("GCP_CREDENTIALS={}".format("<your-credentials>"))
    print("GCP_PROJECT={}".format(project_id))

    confirmation = None
    while confirmation != "yes":
        if confirmation is not None:
            print("Please add the required secrets to your github repo")
        confirmation = input("Have you added the secrets to your github repo? (yes/no): ")

    print("Okay. The required setup should be done by now. We will now trigger the action for deployment...")
    print("TODO: ")



