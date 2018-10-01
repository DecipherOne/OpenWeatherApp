package controllers

import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json._
import play.api.libs.ws._
import play.api.test
import play.api.test.Helpers._
import play.api.test._
import play.api.libs.ws.WSClient

import scala.concurrent.ExecutionContext



class OpenWeatherQueryControllerSpec extends PlaySpec with GuiceOneAppPerTest with Injecting  {

  "OpenWeatherQueryController GET" should{

    "return JSON array with current weather info when request by cityname" in {
      implicit val wsClient = app.injector.instanceOf[WSClient]
      implicit val exContext = app.injector.instanceOf[ExecutionContext]
      val controller = new OpenWeatherQueryController(stubControllerComponents(),wsClient,exContext)
      val weather = controller.RequestCurrentWeatherByCityName().apply(FakeRequest(GET, "/weather?cityName=ames"))

      status(weather) mustBe OK
      contentType(weather) mustBe Some("application/json")
    }


  }

}
