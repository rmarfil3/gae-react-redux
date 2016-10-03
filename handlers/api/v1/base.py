import json

import webapp2


class ApiBaseHandler(webapp2.RequestHandler):
	def render(self, data):
		self.response.headers["Content-Type"] = "application/json"
		self.response.write(json.dumps(data))

	@staticmethod
	def construct_response_details(status, code, message=None):
		"""
		Constructs a response details object.

		:param status: The HTTP status code
		:param code: The custom code for additional identification of response status
		:param message: The descriptive message of the response status
		:return: The response details object
		"""
		details = {}
		details["status"] = status
		details["code"] = code
		if message:
			details["message"] = message
		return details
