const dbConnection = require("../config");

class EventModel {
  static async addEvent(imagePath, title, date, content) {
    const insertEventQuery = `
      INSERT INTO events (image_path, title, date, content)
      VALUES (?, ?, ?, ?)
    `;

    try {
      await dbConnection.query(insertEventQuery, [JSON.stringify(imagePath), title, date, content]);
    } catch (error) {
      throw new Error("Error adding event to the database");
    }
  }

  static async getEvents() {
    const selectEventsQuery = `
      SELECT id, title, date, content, image_path
      FROM events
    `;

    try {
      const results = await dbConnection.query(selectEventsQuery);
      return results;
    } catch (error) {
      throw new Error("Error retrieving events");
    }
  }

  static async deleteEvent(eventId) {
    const deleteEventQuery = `
      DELETE FROM events
      WHERE id = ?
    `;

    try {
      const result = await dbConnection.query(deleteEventQuery, [eventId]);
      return result;
    } catch (error) {
      throw new Error("Error deleting event from the database");
    }
  }

  static async updateEvent(eventId, imagePath, title, date, content) {
    const updateEventQuery = `
      UPDATE events
      SET image_path = ?, title = ?, date = ?, content = ?
      WHERE id = ?
    `;

    try {
      const result = await dbConnection.query(
        updateEventQuery,
        [imagePath, title, date, content, eventId]
      );
      return result;
    } catch (error) {
      throw new Error("Error updating event in the database");
    }
  }
}

module.exports = EventModel;
