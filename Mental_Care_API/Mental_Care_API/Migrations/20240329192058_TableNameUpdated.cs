using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mental_Care_API.Migrations
{
    /// <inheritdoc />
    public partial class TableNameUpdated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PsycologistDetails");

            migrationBuilder.CreateTable(
                name: "PsychologistDetails",
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
                    table.PrimaryKey("PK_PsychologistDetails", x => x.DoctorId);
                    table.ForeignKey(
                        name: "FK_PsychologistDetails_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PsychologistDetails_UserId",
                table: "PsychologistDetails",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PsychologistDetails");

            migrationBuilder.CreateTable(
                name: "PsycologistDetails",
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
        }
    }
}
