import { Box, Divider, Image, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UilLinkedin } from "@iconscout/react-unicons";
import { UilInstagramAlt } from "@iconscout/react-unicons";
import { Button, IconButton } from "@chakra-ui/react";
import { UilGithub } from "@iconscout/react-unicons";
import { Link, useParams } from "react-router-dom";
import cashIconImg from "../../images/cash.png";
import myCode from "../../images/code.png";
import myDomainimg from "../../images/domain.png";
import { SingleProjectForUserProfile } from "./MyProject/SingleProject";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserDetails } from "../../Redux/Actions/UserAction";
import { getMyProjects } from "../../Redux/Actions/ProjectAction";

const UserBio = () => {
  const dispatch = useDispatch();

  const { loading: getSingleUserLoading, user } = useSelector(
    (state) => state.getSingleUser
  );
  const { loading, projects } = useSelector((state) => state.myProject);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getSingleUserDetails(id));
    dispatch(getMyProjects(id));
  }, [id]);

  return (
    <>
      <Box
        p="2rem"
        display="flex"
        flexDirection="column"
        bg="#eff3f6"
        w="100%"
        height="110vh"
      >
        <Box
          mx="auto"
          w="80%"
          h="45%"
          bg="white"
          display="flex"
          flexDirection="row"
          alignItems="center
        "
          justifyContent="center"
        >
          <Box
            width="30%"
            mr="2rem"
            border="0.1px"
            borderRadius="lg"
            bg="white"
            height="90%"
          >
            <Image
              w="100%"
              h="100%"
              src={user.avatar ? user.avatar.url : ""}
              alt="Dan Abramov"
            />
          </Box>
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            p={2}
            flexDirection="column"
            w="50%"
            h="90%"
          >
            <Text fontSize="3rem" fontFamily="nunito sans">
              {user ? user.name : ""}
            </Text>
            <Text fontFamily="Nunito" maxH="5rem">
              {user ? user.bio : ""}
            </Text>
            <Text fontFamily="nunito" fontWeight="bold" maxH="5rem">
              Address :{" "}
              <Text fontWeight="medium" as="span">
                {user ? user.address : ""}
              </Text>
            </Text>
            <Text fontFamily="nunito" fontWeight="bold">
              Email:{" "}
              <Text fontWeight="medium" as="span">
                {user ? user.email : ""}
              </Text>
            </Text>
            <Text fontFamily="nunito" fontWeight="bold">
              Contact No:{" "}
              <Text fontWeight="medium" as="span">
                {user ? user.phoneNo : ""}
              </Text>
            </Text>
            <div className="flex mt-[1.5rem] flex-row ">
              <Link to={user ? user.linkedURL : ""}>
                <IconButton
                  marginRight="1rem"
                  isRound={true}
                  isDisabled={user && user.linkedURL === "" ? true : false}
                  variant="solid"
                  colorScheme="teal"
                  aria-label="Done"
                  fontSize="20px"
                  icon={<UilLinkedin />}
                />
              </Link>
              <Link to={user ? user.instagramURL : ""}>
                <IconButton
                  isRound={true}
                  marginRight="1rem"
                  isDisabled={user && user.instagramURL === "" ? true : false}
                  variant="solid"
                  colorScheme="teal"
                  aria-label="Done"
                  fontSize="20px"
                  icon={<UilInstagramAlt />}
                />
              </Link>

              <Link to={user ? user.githubURL : ""}>
                <IconButton
                  isRound={true}
                  variant="solid"
                  isDisabled={user && user.githubURL === "" ? true : false}
                  colorScheme="teal"
                  aria-label="Done"
                  fontSize="20px"
                  icon={<UilGithub />}
                />
              </Link>
            </div>
          </Box>
        </Box>
        <Divider bg="black" color="black" mt="2rem" />
        <Box w="80%" h="55%" mx="auto" display="flex" flexDirection="column">
          <Text marginLeft="2rem" fontFamily="Nunito" fontSize="3rem">
            His Projects
          </Text>
          <Stack pl="2rem" w="100%" h="100%" overflowY="hidden">
            {projects &&
              projects.length > 0 &&
              projects.map((project) => {
                return <SingleProjectForUserProfile project={project} />;
              })}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default UserBio;
