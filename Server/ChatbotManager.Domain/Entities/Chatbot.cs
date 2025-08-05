using MongoDB.Bson.Serialization.Attributes;

namespace _.Models;



public class ChatMessage
{
    [BsonElement("role")]
    public string Role { get; set; } = ""; // system, user, assistant

    [BsonElement("content")]
    public string Content { get; set; } = "";
}

public class Chatbot
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id { get; set; }



    [BsonElement("name")]
    public string Name { get; set; } = "";

    [BsonElement("description")]
    public string Description { get; set; } = "";

    [BsonElement("owner")]
    public string Owner { get; set; } = ""; // user email

    [BsonElement("messages")]
    public List<ChatMessage> Messages { get; set; } = new();
}