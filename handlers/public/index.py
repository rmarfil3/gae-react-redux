from handlers.public.base import BaseHandler


class IndexPage(BaseHandler):
    def get(self, *args, **kwargs):
        self.render_template("templates/index.html")
