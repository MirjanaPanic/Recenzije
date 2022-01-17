using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjekatWeb.Migrations
{
    public partial class Ver1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Kategorije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategorije", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnici",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnickoIme = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Sifra = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnici", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Mesta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Adresa = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    WebSajt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KategorijaFkID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mesta", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Mesta_Kategorije_KategorijaFkID",
                        column: x => x.KategorijaFkID,
                        principalTable: "Kategorije",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Recenzije",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DobreStrane = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    LoseStrane = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    DatumUnosa = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ocena = table.Column<int>(type: "int", nullable: false),
                    MestoFkID = table.Column<int>(type: "int", nullable: true),
                    KorisnikFkID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recenzije", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Recenzije_Korisnici_KorisnikFkID",
                        column: x => x.KorisnikFkID,
                        principalTable: "Korisnici",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Recenzije_Mesta_MestoFkID",
                        column: x => x.MestoFkID,
                        principalTable: "Mesta",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Mesta_KategorijaFkID",
                table: "Mesta",
                column: "KategorijaFkID");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_KorisnikFkID",
                table: "Recenzije",
                column: "KorisnikFkID");

            migrationBuilder.CreateIndex(
                name: "IX_Recenzije_MestoFkID",
                table: "Recenzije",
                column: "MestoFkID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Recenzije");

            migrationBuilder.DropTable(
                name: "Korisnici");

            migrationBuilder.DropTable(
                name: "Mesta");

            migrationBuilder.DropTable(
                name: "Kategorije");
        }
    }
}
