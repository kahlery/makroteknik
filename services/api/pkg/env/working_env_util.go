package env

import (
	log "api/pkg/log/util"
	"os"
)

func LogWorkingEnv() {
	// Log where is the working directory
	workingDirectory, err := os.Getwd()
	if err != nil {
		log.LogError("failed to get working directory", "LogWorkingEnv()", "")
		return
	}
	log.LogInfo("working directory: "+workingDirectory, "LogWorkingEnv()", "")

	nowDir, err := os.ReadDir(".")
	if err != nil {
		log.LogError("failed to read current directory", "LogWorkingEnv()", "")
		return
	}
	name := nowDir[0].Name()
	log.LogInfo("current directory: "+name, "LogWorkingEnv()", "")
}
