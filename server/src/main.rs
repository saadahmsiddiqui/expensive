#[macro_use]
extern crate rocket;

use rocket::http::uri::Origin;
use rocket::serde::json::{json, Value};

const USERS_API_PREFIX: Origin<'static> = uri!("/users");

#[get("/")]
fn index() -> String {
    String::from("Hello, world!")
}

#[get("/")]
fn create_user_api() -> Value {
    json!({
        "name": "Saad Ahmed Siddiqui"
    })
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .mount("/", routes![index])
        .mount(USERS_API_PREFIX, routes![create_user_api])
}
