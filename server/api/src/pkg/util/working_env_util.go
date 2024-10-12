package util

import "os"

func LogWorkingEnv() {
	// Log where is the working directory
	workingDirectory, err := os.Getwd()
	if err != nil {
		LogError("failed to get working directory")
		return
	}
	LogDebug("working directory: " + workingDirectory)

	nowDir, err := os.ReadDir(".")
	if err != nil {
		LogError("failed to read current directory")
		return
	}
	name := nowDir[0].Name()
	LogDebug("current directory: " + name)
}
