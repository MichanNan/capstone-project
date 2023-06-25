import Heading from "../Heading";
import StyledButton from "../StyledButton";
import ProjectForm from "../ProjectForm";
import BackIcon from "../Icon/BackIcon";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import styled from "styled-components";
import {
  ColoredFont,
  HeavyFont,
  LightFont,
  RowSection,
  Main,
  ImageWrapper,
} from "../../styles";

import { handleProjectRestructure } from "../handelProjectResructure";

import ConfirmDeleteProject from "../ComfirmDeleteProject";

export default function ProjectDetail({ project, onDelete, id }) {
  const [isEdit, setIsEdit] = useState(false);
  const [confirmDeleteProjectStatus, setConfirmDeleteProjectStatus] =
    useState(false);
  const { mutate } = useSWR("/api/project");
  function onEdit() {
    setIsEdit(true);
  }
  const router = useRouter();

  async function handleProjectUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const newProject = handleProjectRestructure(data);
    const response = await fetch(`/api/project?id=${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProject),
    });

    setIsEdit(!isEdit);
    mutate();
  }
  function cancelEdit() {
    setIsEdit(false);
  }
  function cancelDelete() {
    setConfirmDeleteProjectStatus(false);
    router.push(`/${id}`);
  }
  function confirmDelete() {
    setConfirmDeleteProjectStatus(true);
  }
  return (
    <>
      {isEdit ? (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                setIsEdit(false);
              }}
            />
            {project.name}
          </Heading>
          <ProjectForm
            isEdit
            defaultValue={project}
            onCancel={cancelEdit}
            onSubmit={handleProjectUpdate}
            buttonContentLeft="Cancel"
            buttonContentRight="Confirm"
          />
        </Main>
      ) : (
        <Main>
          <Heading>
            <BackIcon
              handleGoBack={() => {
                router.push("/");
              }}
            />
            {project.name}
          </Heading>
          <DetailContainer>
            <ImageWrapper>
              <Image
                src={project.image}
                alt={project.name}
                width={300}
                height="0"
                style={{ width: "100%", height: "auto" }}
              />
            </ImageWrapper>
            {
              <ProjectInfoWrapper>
                This project is &nbsp;
                <ColoredFont>{project.status}</ColoredFont> &nbsp;and you feel
                &nbsp;<ColoredFont>{project.happiness}</ColoredFont>
              </ProjectInfoWrapper>
            }

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Details</ColoredFont>
              </SubTitle>
              <DetailRowSection>
                <HeavyFont>
                  <p>The project is for:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].recipient}</span>
                </LightFont>

                <HeavyFont>
                  <p>Size:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].size}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Gauge:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].gauge}</span>
                </LightFont>

                <HeavyFont>
                  <p>Needle Size:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].needleSize}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Start:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].start}</span>
                </LightFont>

                <HeavyFont>
                  <p>End:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.details[0].end}</span>
                </LightFont>
              </DetailRowSection>
            </ProjectSectionContainer>

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Yarn</ColoredFont>
              </SubTitle>

              <DetailRowSection>
                <HeavyFont>
                  <p>Brand:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].brand}</span>
                </LightFont>

                <HeavyFont>
                  <p>Skeins:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].skeins}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Type:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].type}</span>
                </LightFont>

                <HeavyFont>
                  <p>Gramm:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].gramm}</span>
                </LightFont>
              </DetailRowSection>
              <DetailRowSection>
                <HeavyFont>
                  <p>Color:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].color}</span>
                </LightFont>

                <HeavyFont>
                  <p>Meter:</p>
                </HeavyFont>
                <LightFont>
                  <span>{project.yarn[0].meter}</span>
                </LightFont>
              </DetailRowSection>
            </ProjectSectionContainer>

            <ProjectSectionContainer>
              <SubTitle>
                <ColoredFont>Note:</ColoredFont>
              </SubTitle>

              <LightFont>{project.note}</LightFont>
            </ProjectSectionContainer>

            <RowSection>
              <StyledButton width="8rem" height="3rem" onClick={confirmDelete}>
                Delete
              </StyledButton>
              <StyledButton width="8rem" height="3rem" onClick={onEdit}>
                Edit
              </StyledButton>
            </RowSection>
          </DetailContainer>
          {confirmDeleteProjectStatus && (
            <ConfirmDeleteProject
              id={id}
              cancelDelete={cancelDelete}
              onDelete={onDelete}
            />
          )}
        </Main>
      )}
    </>
  );
}
const DetailContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 1rem;
  margin-top: 3rem;
`;
const ProjectInfoWrapper = styled.section`
  display: flex;
  margin: 1rem auto;
  justify-content: center;
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;
const ProjectSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: start;
  width: 100%;
`;
const DetailRowSection = styled.div`
  display: flex;
  gap: 1.2rem;
`;
