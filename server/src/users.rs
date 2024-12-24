use crate::models::{NewUser, User};
use diesel::{PgConnection, RunQueryDsl};

pub fn create_user(conn: &mut PgConnection, username: &str) -> User {
    use crate::schema::users;

    let new_user = NewUser {
        username: String::from(username),
        id: None,
        email: None,
        created_at: None,
    };

    let inserted_user = diesel::insert_into(users::table)
        .values(&new_user)
        .get_result(conn);

    inserted_user.unwrap()
}
