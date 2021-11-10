#/bin/sh

echo "Checking prerequisites..."
if ! command -v gcloud &> /dev/null
then
    echo "Error: Google Cloud SDK doesn't seem to be installed, please install (command gcloud not found in PATH)"
    exit
fi

if ! command -v expo-cli &> /dev/null
then
    echo "Error: Expo cli doesn't seem to be installed, please install (command expo-cli not found in PATH)"
    exit
fi

if ! command -v yarn &> /dev/null
then
    echo "Error: Yarn package manager doesn't seem to be installed, please install (command yarn not found in PATH)"
    exit
fi

echo "All dependencies seem to be installed correctly, we now proceed with creating the project on google cloud"

echo "Choose your platform:"
echo "[1] Mac Os (Intel)"
echo "[2] Mac Os (Apple Silicon)"
echo "[3] Linux"
echo "[4] Windows (this is untested and discouraged)"
echo "Please type in the number of your plaform"
read platform

case $platform in
  1)
    echo "Chosen platform: Mac Os (Intel)"
    ;;
  2)
    echo "Chosen platform: Mac OS (Apple Silicon)"
    ;;
  3)
    echo "Chosen platform: Linux"
    ;;
  4)
    echo "Chosen platform: Windows"
    ;;
esac

echo "The active gcloud account will be listed, please confirm that this is the Google Cloud Account you want to use to create the project in"
gcloud auth list
echo "Is this the account you want to use? (yes/no)"
read confirmation
if [ "$confirmation" != "yes" ]; then
   echo "You did not type in 'yes' so we cancelled the creation. Please set the appropriate account you want to use using the following command"
   echo "gcloud config set account <accountemailaddress>"
   echo "After that you can run the script again"
   exit
fi

echo "Enter new project id (must be unique accross google cloud)"
read project_id
echo "Enter project name"
read project_name

echo "Creating project on google cloud..."
gcloud projects create $project_id --name="${project_name}"

echo "Creating service account on new project..."
service_account_name = "${project_id}-sa-github-actions"
gcloud iam service-accounts create $service_account_name --display-name="${project_name} service account"

mysql_instance_name="${project_id}-mysql"

echo "Creating mysql instance on google cloud ..."
gcloud sql instances create $mysql_instance_name

echo "Downloading google cloud proxy for local connecting to database..."
curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64
chmod +x cloud_sql_proxy

echo "Cloud SQL Proxy has been downloaded, for manual development you can connect to the proxy using the following command:"
echo "cloud_sql_proxy -instances=${project_id}:${us-central1-f}:${postgres_instance_name}=tcp:3306"

echo "Please sign in to your account on expo and create a new access token on https://expo.dev/settings/access-tokens"
echo "Paste your obtained access token here:"
read expo_access_token

