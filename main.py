#!/usr/bin/env python
# -- coding: utf-8 --
import webapp2
from webapp2_extras import routes

# public
from handlers.public.index import IndexPage

app = webapp2.WSGIApplication([
    routes.DomainRoute(r"<:.*>", [
        webapp2.Route("<:.*>", handler=IndexPage, name="www-index")
    ])
], debug=True)

api = webapp2.WSGIApplication([
    routes.DomainRoute(r"<:.*>", [
        routes.PathPrefixRoute("/api", [
            routes.PathPrefixRoute("/v1", [
                webapp2.Route("/", handler=IndexPage, name="api-index")
            ])
        ])
    ])
], debug=True)
