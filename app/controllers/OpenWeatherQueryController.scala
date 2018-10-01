package controllers

import javax.inject.Inject

import scala.concurrent.Future
import scala.concurrent.duration._
import scala.concurrent.ExecutionContext
import play.api.mvc._
import play.api.libs.ws._
import play.api.libs.json
import play.api.http.HttpEntity
import akka.actor.ActorSystem
import akka.stream.ActorMaterializer
import akka.stream.scaladsl._
import akka.util.ByteString
import play.api.libs.json._

class OpenWeatherQueryController @Inject()(cc: ControllerComponents,ws: WSClient, implicit val ec: ExecutionContext) extends AbstractController(cc) {

  var apiKey : String ="a86ba034882a7573aae58a6e6b3fe80b"
  var responseString : String = ""
  var responseCode : Int = 200

  def RequestCurrentWeatherByCityName() = Action { implicit request: Request[AnyContent] =>

    val param: String = "?q="
    val cityName = request.queryString("cityName")
    val requestString: String = "https://api.openweathermap.org/data/2.5/weather" + param + cityName(0) + "&appid=" + apiKey
    val currentWeatherRequest: WSRequest = ws.url(requestString).withRequestTimeout(7 seconds)

    currentWeatherRequest.get().map { response =>

      response.status match{
        case 200 =>
          responseString = response.body
        case 404 =>
          responseString = "Could not find the requested city"
        case _ =>
          responseString = "There was an error with the request"
      }
      responseCode = response.status
      println(responseString)

    }

    Result(ResponseHeader(responseCode),body = HttpEntity.Strict(ByteString(responseString), Some("application/json")))

  }

}
