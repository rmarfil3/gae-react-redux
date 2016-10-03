import os

import jinja2
import webapp2

# setup template
JINJA_ENVIRONMENT = jinja2.Environment(
	loader=jinja2.FileSystemLoader(
		os.path.dirname("frontend/")
	),
	autoescape=True
)
JINJA_ENVIRONMENT.globals['uri_for'] = webapp2.uri_for


class BaseHandler(webapp2.RequestHandler):
	def render_template(self, _template, _template_values={}):
		"""Renders a template and writes the result to the response.

		:param _template: The location of the template
		:param _template_values: The template values
		"""
		template = JINJA_ENVIRONMENT.get_template(_template)
		rv = template.render(_template_values)
		self.response.write(rv)
