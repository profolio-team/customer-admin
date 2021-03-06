import MaterialTable from "material-table";
import { Box, Container, Typography } from "@mui/material";

export function TableDesign() {
  return (
    <Container maxWidth="xl" className="design-system-container">
      <Box>
        <Typography variant="h2" component="h2">
          Tables
        </Typography>
      </Box>
      <hr />
      <MaterialTable
        columns={[
          { title: "Full name", field: "name" },
          { title: "Location", field: "location" },
          {
            title: "Job title",
            field: "job",
            lookup: { 1: "UX/UI designer", 2: "Developer", 3: "QA" },
          },
          { title: "Grade", field: "grade", lookup: { 1: "Lead", 2: "Senior", 3: "Middle" } },

          {
            title: "System role",
            field: "role",
            lookup: { 1: "User", 2: "Manager", 3: "Sales" },
          },
          { title: "System status", field: "status", lookup: { 1: "Active", 2: "Inactive" } },
        ]}
        data={[
          {
            status: 1,
            name: "Mcleod Ware",
            location: "Cochranville",
            role: 2,
            grade: 2,
            job: 2,
          },
          {
            status: 2,
            name: "Bishop Lynch",
            location: "Dupuyer",
            role: 3,
            grade: 1,
            job: 3,
          },
          {
            status: 1,
            name: "Essie Griffin",
            location: "Neibert",
            role: 2,
            grade: 2,
            job: 1,
          },
          {
            status: 1,
            name: "Allison Richmond",
            location: "Noxen",
            role: 1,
            grade: 3,
            job: 2,
          },
          {
            status: 2,
            name: "Galloway Pickett",
            location: "Brogan",
            role: 3,
            grade: 3,
            job: 1,
          },
          {
            status: 1,
            name: "Hogan Pena",
            location: "Rutherford",
            role: 2,
            grade: 1,
            job: 3,
          },
          {
            status: 2,
            name: "Gwen Atkinson",
            location: "Chautauqua",
            role: 2,
            grade: 3,
            job: 1,
          },
          {
            status: 2,
            name: "Elliott Walters",
            location: "Smock",
            role: 2,
            grade: 2,
            job: 3,
          },
          {
            status: 2,
            name: "Kimberly Petersen",
            location: "Stagecoach",
            role: 1,
            grade: 2,
            job: 1,
          },
          {
            status: 1,
            name: "Collins Scott",
            location: "Vivian",
            role: 3,
            grade: 3,
            job: 1,
          },
          {
            status: 2,
            name: "Gibbs Hendricks",
            location: "Sultana",
            role: 3,
            grade: 3,
            job: 3,
          },
          {
            status: 1,
            name: "Wanda Moses",
            location: "Hayes",
            role: 1,
            grade: 3,
            job: 1,
          },
          {
            status: 2,
            name: "Hayden Villarreal",
            location: "Whitehaven",
            role: 2,
            grade: 3,
            job: 2,
          },
          {
            status: 1,
            name: "Marquita Kramer",
            location: "Forestburg",
            role: 2,
            grade: 3,
            job: 3,
          },
          {
            status: 1,
            name: "Kirby Mcbride",
            location: "Nadine",
            role: 1,
            grade: 2,
            job: 1,
          },
          {
            status: 1,
            name: "Fowler Cooley",
            location: "Advance",
            role: 3,
            grade: 2,
            job: 3,
          },
          {
            status: 1,
            name: "Lynne Espinoza",
            location: "Watrous",
            role: 3,
            grade: 3,
            job: 1,
          },
          {
            status: 2,
            name: "Sanchez Wilcox",
            location: "Muse",
            role: 3,
            grade: 2,
            job: 2,
          },
          {
            status: 1,
            name: "Goldie Mckenzie",
            location: "Caberfae",
            role: 2,
            grade: 3,
            job: 3,
          },
          {
            status: 1,
            name: "Aurora Fowler",
            location: "Dunlo",
            role: 2,
            grade: 3,
            job: 2,
          },
          {
            status: 2,
            name: "Weeks Montgomery",
            location: "Retsof",
            role: 3,
            grade: 1,
            job: 2,
          },
          {
            status: 2,
            name: "Emily Franklin",
            location: "Beason",
            role: 1,
            grade: 2,
            job: 3,
          },
          {
            status: 1,
            name: "Cheryl Carpenter",
            location: "Lavalette",
            role: 1,
            grade: 2,
            job: 2,
          },
          {
            status: 1,
            name: "Sykes Christian",
            location: "Cobbtown",
            role: 1,
            grade: 3,
            job: 2,
          },
          {
            status: 2,
            name: "Kerri Craig",
            location: "Driftwood",
            role: 1,
            grade: 3,
            job: 2,
          },
        ]}
        title="Design Table"
      />
    </Container>
  );
}
