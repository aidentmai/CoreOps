using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddSeenToMessage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1bc6bdb-b75c-4078-b56f-6f2c10c3316a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ec629841-8cd6-4d23-a70c-7aa947577fa3");

            migrationBuilder.AddColumn<bool>(
                name: "seen",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "84f96a85-186e-476d-9458-68f6d9611b78", null, "User", "USER" },
                    { "923b3ecf-4e97-4bae-952c-db1788f2a0b1", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84f96a85-186e-476d-9458-68f6d9611b78");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "923b3ecf-4e97-4bae-952c-db1788f2a0b1");

            migrationBuilder.DropColumn(
                name: "seen",
                table: "Messages");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a1bc6bdb-b75c-4078-b56f-6f2c10c3316a", null, "User", "USER" },
                    { "ec629841-8cd6-4d23-a70c-7aa947577fa3", null, "Admin", "ADMIN" }
                });
        }
    }
}
