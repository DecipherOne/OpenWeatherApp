package controllers

import javax.inject.Inject
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents, Request}

class BodyController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  def body() = Action{implicit request: Request[AnyContent] =>
    Ok(views.html.body(request.toString()))
  }
}
