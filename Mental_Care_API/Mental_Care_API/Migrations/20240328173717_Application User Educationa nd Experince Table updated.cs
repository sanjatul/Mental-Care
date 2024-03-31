using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mental_Care_API.Migrations
{
    /// <inheritdoc />
    public partial class ApplicationUserEducationandExperinceTableupdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Educations_PsycologistDetails_PsycologistDetailsId",
                table: "Educations");

            migrationBuilder.DropForeignKey(
                name: "FK_Experiences_PsycologistDetails_PsycologistDetailsId",
                table: "Experiences");

            migrationBuilder.DropIndex(
                name: "IX_Experiences_PsycologistDetailsId",
                table: "Experiences");

            migrationBuilder.DropIndex(
                name: "IX_Educations_PsycologistDetailsId",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "PsycologistDetailsId",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "PsycologistDetailsId",
                table: "Educations");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Experiences",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Educations",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_UserId",
                table: "Experiences",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Educations_UserId",
                table: "Educations",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Educations_AspNetUsers_UserId",
                table: "Educations",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Experiences_AspNetUsers_UserId",
                table: "Experiences",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Educations_AspNetUsers_UserId",
                table: "Educations");

            migrationBuilder.DropForeignKey(
                name: "FK_Experiences_AspNetUsers_UserId",
                table: "Experiences");

            migrationBuilder.DropIndex(
                name: "IX_Experiences_UserId",
                table: "Experiences");

            migrationBuilder.DropIndex(
                name: "IX_Educations_UserId",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Experiences");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Educations");

            migrationBuilder.DropColumn(
                name: "Age",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "PsycologistDetailsId",
                table: "Experiences",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PsycologistDetailsId",
                table: "Educations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Experiences_PsycologistDetailsId",
                table: "Experiences",
                column: "PsycologistDetailsId");

            migrationBuilder.CreateIndex(
                name: "IX_Educations_PsycologistDetailsId",
                table: "Educations",
                column: "PsycologistDetailsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Educations_PsycologistDetails_PsycologistDetailsId",
                table: "Educations",
                column: "PsycologistDetailsId",
                principalTable: "PsycologistDetails",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Experiences_PsycologistDetails_PsycologistDetailsId",
                table: "Experiences",
                column: "PsycologistDetailsId",
                principalTable: "PsycologistDetails",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
