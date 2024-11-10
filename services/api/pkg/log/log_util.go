package log

import (
	"fmt"
	"runtime"
	"time"
)

const (
	reset  = "\033[0m"
	red    = "\033[31m"
	green  = "\033[32m"
	yellow = "\033[33m"
	blue   = "\033[34m"
)

// LogError logs an error message in red, with a timestamp, file, and line number
func LogError(str string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Get file, line number, and function name of where LogError was called
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		file = "???"
		line = 0
	}

	// Print the log with red color for error
	fmt.Printf("%serror: %s ==> %s:%d %s%s\n", red, timestamp, file, line, str, reset)
}

// LogInfo logs an informational message in green, with a timestamp
func LogSuccess(str string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with green color for success
	fmt.Printf("%ssuccess: %s ==> %s%s\n", green, timestamp, str, reset)
}

// LogWarn logs a warning message in yellow, with a timestamp
func LogWarn(str string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with yellow color for warning
	fmt.Printf("%swarn: %s ==> %s%s\n", yellow, timestamp, str, reset)
}

// LogDebug logs a debug message in blue, with a timestamp
func LogDebug(str string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with blue color for debug
	fmt.Printf("%sinfo: %s ==> %s%s\n", blue, timestamp, str, reset)
}
