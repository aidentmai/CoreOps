using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;


namespace api.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Status
    {
        [EnumMember(Value = "Open")]
        Open,

        [EnumMember(Value = "In Progress")]
        InProgress,

        [EnumMember(Value = "Completed")]
        Completed
    }
}