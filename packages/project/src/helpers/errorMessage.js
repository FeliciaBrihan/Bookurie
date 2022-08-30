export function errorMessage(error) {
	return error.errors
		? { error: error.message, details: error.errors[0]?.message }
		: { error: error.message };
}
