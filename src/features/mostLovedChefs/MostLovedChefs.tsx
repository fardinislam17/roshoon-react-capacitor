import React from "react";
import { Box, Stack, styled } from "@mui/material";
import { useGetMostLovedChefsQuery } from "./mostLovedChefsApi";

const RootContainer = styled(Stack)((theme) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 5,
}));

const StyledContainer = styled(Stack)(({ theme }) => ({
  maxWidth: 200,
  justifyContent: "space-between",
  padding: theme.spacing(2),
}));

const StyledTitle = styled("h5")(({ theme }) => ({
  padding: 0,
  margin: "5px 0",
}));

const StyledCategory = styled("h6")(({ theme }) => ({
  padding: 0,
  margin: 0,
}));

const StyledImage = styled(Box)<{
  component?: React.ElementType;
  alt: string;
  src: string;
}>(({ theme }) => ({
  height: 200,
  width: 200,
  borderRadius: "8px",
  boxShadow: theme.shadows[3],
  marginTop: theme.spacing(1),
}));

const MostLovedChefs = () => {
  const { data, isLoading } = useGetMostLovedChefsQuery();

  return (
    <RootContainer>
      {data?.map((product) => {
        const { id, category, title, image } = product;
        return (
          <StyledContainer key={id}>
            <StyledImage key={id} component="img" alt={title} src={image} />
            <>
              <StyledTitle>{title}</StyledTitle>
              <StyledCategory>Category: {category}</StyledCategory>
            </>
          </StyledContainer>
        );
      })}
    </RootContainer>
  );
};

export default MostLovedChefs;
