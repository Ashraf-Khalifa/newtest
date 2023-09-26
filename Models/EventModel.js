const dbConnection = require("../config");

class EventModel {
  static addEvent(imagePath, title, date, content, callback) {
    const insertEventQuery = `
      INSERT INTO events (image_path, title, date, content)
      VALUES (?, ?, ?, ?)
    `;

    dbConnection.query(
      insertEventQuery,
      [imagePath, title, date, content],
      callback
    );
  }

  static getEvents(callback) {
    const selectEventsQuery = `
      SELECT id, title, date, content, image_path
      FROM events
    `;

    dbConnection.query(selectEventsQuery, callback);
  }


  static deleteEvent(eventId, callback) {
    const deleteEventQuery = `
      DELETE FROM events
      WHERE id = ?
    `;
  
    dbConnection.query(deleteEventQuery, [eventId], callback);
  }

  static updateEvent(eventId, imagePath, title, date, content, callback) {
    const updateEventQuery = `
      UPDATE events
      SET image_path = ?, title = ?, date = ?, content = ?
      WHERE id = ?
    `;
  
    dbConnection.query(
      updateEventQuery,
      [imagePath, title, date, content, eventId],
      callback
    );
  }
  
  
}

module.exports = EventModel;
