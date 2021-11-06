package main

import (
	"github.com/kelseyhightower/envconfig"
	"log"
)

type Config struct {
	Debug bool `required:"true"`

	DbPort string `required:"true"`
	DbHost string `required:"true"`
	DbUsername string `required:"true"`
	DbPassword string `required:"true"`
}

func main(){
	var config Config
	err := envconfig.Process("Server", &config)
	if err != nil {
		log.Fatalf("Error reading config from environment variables %s", err.Error())
	}

	log.Println(config.DbPort)
}