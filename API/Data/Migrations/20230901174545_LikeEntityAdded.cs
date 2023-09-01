using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class LikeEntityAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    TargetUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.SourceUserId, x.TargetUserId });
                    table.ForeignKey(
                        name: "FK_Likes_Users_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Likes_Users_TargetUserId",
                        column: x => x.TargetUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserLikeUserLike",
                columns: table => new
                {
                    LikedByUsersSourceUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LikedByUsersTargetUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LikedUsersSourceUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LikedUsersTargetUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLikeUserLike", x => new { x.LikedByUsersSourceUserId, x.LikedByUsersTargetUserId, x.LikedUsersSourceUserId, x.LikedUsersTargetUserId });
                    table.ForeignKey(
                        name: "FK_UserLikeUserLike_Likes_LikedByUsersSourceUserId_LikedByUsersTargetUserId",
                        columns: x => new { x.LikedByUsersSourceUserId, x.LikedByUsersTargetUserId },
                        principalTable: "Likes",
                        principalColumns: new[] { "SourceUserId", "TargetUserId" },
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserLikeUserLike_Likes_LikedUsersSourceUserId_LikedUsersTargetUserId",
                        columns: x => new { x.LikedUsersSourceUserId, x.LikedUsersTargetUserId },
                        principalTable: "Likes",
                        principalColumns: new[] { "SourceUserId", "TargetUserId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Likes_TargetUserId",
                table: "Likes",
                column: "TargetUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserLikeUserLike_LikedUsersSourceUserId_LikedUsersTargetUserId",
                table: "UserLikeUserLike",
                columns: new[] { "LikedUsersSourceUserId", "LikedUsersTargetUserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserLikeUserLike");

            migrationBuilder.DropTable(
                name: "Likes");
        }
    }
}
