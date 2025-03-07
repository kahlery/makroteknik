package util

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
	orange = "\033[38;5;208m"
)

// LogError logs an error message in red, with a timestamp, file, and line number
func LogError(str string, location string, processID string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Get file, line number, and function name of where LogError was called
	_, file, line, ok := runtime.Caller(1)
	if !ok {
		file = "???"
		line = 0
	}

	// Print the log with red color for error and line spacing
	if location != "" {
		fmt.Printf("\n%s%s | %s%s", red, location, processID, reset)
		fmt.Printf("\n%sERROR: %s ==> %s:%d %s%s\n", red, timestamp, file, line, str, reset)
	} else {
		fmt.Printf("\n%sERROR: %s ==> %s:%d %s%s\n", red, timestamp, file, line, str, reset)

	}
}

// LogSuccess logs an informational message in green, with a timestamp
func LogSuccess(str string, location string, processID string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with green color for success and line spacing
	if location != "" {
		fmt.Printf("\n%s%s | %s%s", green, location, processID, reset)
		fmt.Printf("\n%sSUCCESS: %s ==> %s%s\n", green, timestamp, str, reset)
	} else {
		fmt.Printf("\n%sSUCCESS: %s ==> %s%s\n", green, timestamp, str, reset)
	}
}

// LogWarn logs a warning message in orange, with a timestamp
func LogWarn(body string, location string, processID string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with orange color for warning and line spacing
	if location != "" {
		fmt.Printf("\n%s%s | %s%s", orange, location, processID, reset)
		fmt.Printf("\n%sWARNING: %s ==> %s%s\n", orange, timestamp, body, reset)
		return
	} else {
		fmt.Printf("\n%sWARNING: %s ==> %s%s\n", orange, timestamp, body, reset)
	}
}

// LogTask logs a debug message in yellow, with a timestamp
func LogTask(str string, location string, processID string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with yellow color for debug and line spacing
	if location != "" {
		fmt.Printf("\n%s%s | %s%s", yellow, location, processID, reset)
		fmt.Printf("\n%sTASK: %s ==> %s%s\n", yellow, timestamp, str, reset)
	} else {
		fmt.Printf("\n%sTAKS: %s ==> %s%s\n", yellow, timestamp, str, reset)
	}
}

func LogInfo(str string, location string, processID string) {
	// Get the current timestamp
	timestamp := time.Now().Format("2006-01-02 15:04:05")

	// Print the log with yellow color for debug and line spacing
	if location != "" {
		fmt.Printf("\n%s | %s", location, processID)
		fmt.Printf("\nTASK: %s ==> %s\n", timestamp, str)
	} else {
		fmt.Printf("\nTAKS: %s ==> %s\n", timestamp, str)
	}
}
