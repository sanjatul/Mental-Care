using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mental_Care_API.Migrations
{
    /// <inheritdoc />
    public partial class DoctorsDetailsTabledRenamedToPscologistDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Educations_DoctorDetails_DoctorDetailsId",
                table: "Educations");

            migrationBuilder.DropForeignKey(
                name: "FK_Experiences_DoctorDetails_DoctorDetailsId",
                table: "Experiences");

            migrationBuilder.DropTable(
                name: "DoctorDetails");

            migrationBuilder.RenameColumn(
                name: "DoctorDetailsId",
                table: "Experiences",
                newName: "PsycologistDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Experiences_DoctorDetailsId",
                table: "Experiences",
                newName: "IX_Experiences_PsycologistDetailsId");

            migrationBuilder.RenameColumn(
                name: "DoctorDetailsId",
                table: "Educations",
                newName: "PsycologistDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Educations_DoctorDetailsId",
                table: "Educations",
                newName: "IX_Educations_PsycologistDetailsId");

            migrationBuilder.CreateTable(
                name: "PsycologistDetails",
                columns: table => new
                {
                    DoctorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearsOfExperience = table.Column<int>(type: "int", nullable: true),
                    Certificate = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PsycologistDetails", x => x.DoctorId);
                    table.ForeignKey(
                        name: "FK_PsycologistDetails_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PsycologistDetails_UserId",
                table: "PsycologistDetails",
                column: "UserId");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Educations_PsycologistDetails_PsycologistDetailsId",
                table: "Educations");

            migrationBuilder.DropForeignKey(
                name: "FK_Experiences_PsycologistDetails_PsycologistDetailsId",
                table: "Experiences");

            migrationBuilder.DropTable(
                name: "PsycologistDetails");

            migrationBuilder.RenameColumn(
                name: "PsycologistDetailsId",
                table: "Experiences",
                newName: "DoctorDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Experiences_PsycologistDetailsId",
                table: "Experiences",
                newName: "IX_Experiences_DoctorDetailsId");

            migrationBuilder.RenameColumn(
                name: "PsycologistDetailsId",
                table: "Educations",
                newName: "DoctorDetailsId");

            migrationBuilder.RenameIndex(
                name: "IX_Educations_PsycologistDetailsId",
                table: "Educations",
                newName: "IX_Educations_DoctorDetailsId");

            migrationBuilder.CreateTable(
                name: "DoctorDetails",
                columns: table => new
                {
                    DoctorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Certificate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    YearsOfExperience = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoctorDetails", x => x.DoctorId);
                    table.ForeignKey(
                        name: "FK_DoctorDetails_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DoctorDetails_UserId",
                table: "DoctorDetails",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Educations_DoctorDetails_DoctorDetailsId",
                table: "Educations",
                column: "DoctorDetailsId",
                principalTable: "DoctorDetails",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Experiences_DoctorDetails_DoctorDetailsId",
                table: "Experiences",
                column: "DoctorDetailsId",
                principalTable: "DoctorDetails",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
