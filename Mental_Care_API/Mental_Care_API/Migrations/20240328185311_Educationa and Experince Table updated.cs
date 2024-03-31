using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mental_Care_API.Migrations
{
    /// <inheritdoc />
    public partial class EducationaandExperinceTableupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Experiences",
                newName: "WorkPlace");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Educations",
                newName: "Institute");

            migrationBuilder.AddColumn<string>(
                name: "Designation",
                table: "Experiences",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Degree",
                table: "Educations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Designation",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "Degree",
                table: "Educations");

            migrationBuilder.RenameColumn(
                name: "WorkPlace",
                table: "Experiences",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "Institute",
                table: "Educations",
                newName: "Description");
        }
    }
}
