package conf

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Server struct {
		Address string `yaml:"address"`
	} `yaml:"server"`

	MongoDB struct {
		URI      string `yaml:"uri"`
		Database string `yaml:"database"`
	}
}

var Cfg Config

func LoadConfig() {
	file, err := os.Open("conf/config.yaml")
	if err != nil {
		log.Fatalf("failed to open config file: %v", err)
	}
	defer file.Close()

	decoder := yaml.NewDecoder(file)
	if err := decoder.Decode(&Cfg); err != nil {
		log.Fatalf("failed to decode config file: %v", err)
	}
}
