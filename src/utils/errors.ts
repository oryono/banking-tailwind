export function generateErrorMessage(error) {
    if (!error || !error.message) return null;

    const isNetworkError =
        error.networkError &&
        error.networkError.message &&
        error.networkError.statusCode;

    const hasGraphQLErrors = error.graphQLErrors && error.graphQLErrors.length;

    let errorMessage;

    if (isNetworkError) {
        if (error.networkError.statusCode === 404) {
            errorMessage = "404: Not Found";
        } else {
            errorMessage = `${error.networkError.statusCode}: ${error.networkError.message}`
        }
    } else if (hasGraphQLErrors) {
        errorMessage = error.graphQLErrors.map(({ message, details }, i) => {
            const messageHead = message;

            let detailsBag = [];
            if (details) {
                Object.keys(details).map(key => (
                    detailsBag.push(details[key])
                ))
            }
            return `${messageHead}: ${detailsBag.toString()}`
        })[0]
    } else {
        errorMessage = error.message
    }

    return errorMessage;
}