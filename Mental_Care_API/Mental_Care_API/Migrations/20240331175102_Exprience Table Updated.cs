using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mental_Care_API.Migrations
{
    /// <inheritdoc />
    public partial class ExprienceTableUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDisplay",
                table: "Experiences",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDisplay",
                table: "Experiences");
        }
    }
}
