use diesel::prelude::*;
use diesel::data_types::PgTimestamp;
use uuid::Uuid;

#[derive(Queryable, Selectable)]
#[diesel(table_name = crate::schema::users)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub email: Option<String>,
    pub created_at: PgTimestamp,
}


#[derive(Insertable)]
#[diesel(table_name = crate::schema::users)]
pub struct NewUser {
    pub id: Option<Uuid>,
    pub username: String,
    pub email: Option<String>,
    pub created_at: Option<PgTimestamp>
}