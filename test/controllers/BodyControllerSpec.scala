package controllers

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.test._
import play.api.test.Helpers._

class BodyControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting {

  "BodyController Get" should {
    "render the body template from a new instance of controller" in {
      val controller = new HomeController(stubControllerComponents())
      val body = controller.index().apply(FakeRequest(GET, "/"))

      status(body) mustBe OK
      contentType(body) mustBe Some("text/html")
      contentAsString(body) must include("top")
    }

    "render the body template from the application" in {
      val controller = inject[HomeController]
      val body = controller.index().apply(FakeRequest(GET, "/"))

      status(body) mustBe OK
      contentType(body) mustBe Some("text/html")
      contentAsString(body) must include("top")
    }

    "render the body template from the router" in {
      val request = FakeRequest(GET, "/")
      val body = route(app, request).get

      status(body) mustBe OK
      contentType(body) mustBe Some("text/html")
      contentAsString(body) must include("top")
    }
  }
}
