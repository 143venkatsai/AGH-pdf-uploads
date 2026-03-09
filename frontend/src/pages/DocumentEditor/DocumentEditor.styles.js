import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 24px 16px;
  background: ${(props) => (props.theme.mode === "DARK" ? "#0d0d0d" : "#f7f4f4")};
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid ${(props) => (props.theme.mode === "DARK" ? "#2a2a2a" : "#141414")};
  border-radius: 14px;
  background: ${(props) => props.theme.body.primary.base};
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const BackButton = styled.button`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => props.theme.text.secondary};
  font-size: 14px;
  cursor: pointer;
`;

export const Label = styled.label`
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
`;

const fieldBase = `
  width: 100%;
  border-radius: 10px;
  border: 1px solid;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
`;

export const MainTitleField = styled.input`
  ${fieldBase}
  border-color: ${(props) => props.theme.border.primary};
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.secondary.base : "#f8f9fb"};
  color: ${(props) => props.theme.text.primary};
  padding: 12px 14px;
  font-size: 22px;
  font-weight: 600;

  &:focus {
    border-color: ${(props) => props.theme.primary.base};
    box-shadow: 0 0 0 2px ${(props) => props.theme.shadow.opacity_10};
  }
`;

export const Preview = styled.div`
  position: relative;
  width: 100%;
  min-height: 420px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.theme.mode === "DARK" ? "#2a2a2a" : "#141414")};
  overflow: hidden;
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.secondary.base : "#eceef2"};

  @media (max-width: 900px) {
    min-height: 320px;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 420px;
  object-fit: contain;
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.primary.base : "#f4f5f7"};

  @media (max-width: 900px) {
    min-height: 320px;
  }
`;

export const EmptyState = styled.div`
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.text.secondary};

  svg {
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Badge = styled.div`
  position: absolute;
  right: 12px;
  bottom: 12px;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  color: ${(props) => props.theme.text.primary};
  background: ${(props) => props.theme.body.primary.base};
  border: 1px solid ${(props) => (props.theme.mode === "DARK" ? "#2a2a2a" : "#141414")};
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

export const Input = styled.input`
  ${fieldBase}
  border-color: ${(props) => props.theme.border.primary};
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.secondary.base : "#f8f9fb"};
  color: ${(props) => props.theme.text.primary};
  padding: 12px 14px;
  margin-top: 8px;
  font-size: 15px;

  &:focus {
    border-color: ${(props) => props.theme.primary.base};
    box-shadow: 0 0 0 2px ${(props) => props.theme.shadow.opacity_10};
  }
`;

export const DescriptionField = styled.textarea`
  ${fieldBase}
  border-color: ${(props) => props.theme.border.primary};
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.secondary.base : "#f8f9fb"};
  color: ${(props) => props.theme.text.primary};
  padding: 12px 14px;
  margin-top: 8px;
  min-height: 104px;
  resize: vertical;
  font-size: 14px;
  line-height: 1.5;

  &:focus {
    border-color: ${(props) => props.theme.primary.base};
    box-shadow: 0 0 0 2px ${(props) => props.theme.shadow.opacity_10};
  }
`;

export const ThumbnailsRow = styled.div`
  border-top: 1px solid ${(props) => props.theme.border.primary};
  padding-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
`;

export const Thumbnail = styled.button`
  width: 84px;
  min-width: 84px;
  border-radius: 10px;
  border: 2px solid ${(props) => (props.$active ? props.theme.primary.base : props.theme.mode === "DARK" ? "#2d2d2d" : "#171717")};
  padding: 6px;
  background: ${(props) =>
    props.theme.mode === "DARK" ? props.theme.body.secondary.base : "#f8f9fb"};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  color: ${(props) => props.theme.text.secondary};
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 96px;
  object-fit: cover;
  border-radius: 6px;
`;

export const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  border-radius: 10px;
  border: 1px solid ${(props) => (props.theme.mode === "DARK" ? "#2a2a2a" : "#141414")};
  color: ${(props) => props.theme.text.primary};
  background: ${(props) => (props.theme.mode === "DARK" ? "#111111" : "#f3eeee")};
  padding: 12px 18px;
  font-weight: 600;
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  border-radius: 10px;
  border: 1px solid transparent;
  background: ${(props) => props.theme.primary.base};
  color: #ffffff;
  padding: 12px 18px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${(props) => props.theme.text.primary};
`;

export const Subtitle = styled.p`
  margin: 0;
  color: ${(props) => props.theme.text.secondary};
  font-size: 14px;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
`;

