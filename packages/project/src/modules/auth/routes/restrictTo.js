export function restrictTo(...roles) {
	return function (req, res, next) {
		if (!roles.includes(req.currentUser.role)) {
			const error = new Error(
				`You don't have permission to perform this action`
			);
			return next(error);
		}
		next();
	};
}
