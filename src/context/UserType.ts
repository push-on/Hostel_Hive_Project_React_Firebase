const USER_TYPES = {
	STUDENT: "student",
	STAFF: "staff",
	ADMIN: "admin",
}

export function userType(CURRENT_USER_TYPE: string) {
	switch (CURRENT_USER_TYPE) {
		case USER_TYPES.STUDENT:
			return console.log("User is a student.")
		case USER_TYPES.STAFF:
			return console.log("User is a staff member.")
		case USER_TYPES.ADMIN:
			return console.log("User is an admin.")
		default:
			return console.log("User type is not recognized.")
	}
}