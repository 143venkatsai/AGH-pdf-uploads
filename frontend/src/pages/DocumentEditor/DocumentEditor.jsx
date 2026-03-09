import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ActionRow,
  BackButton,
  Badge,
  CancelButton,
  Card,
  DescriptionField,
  EmptyState,
  FooterActions,
  FormRow,
  Input,
  Label,
  MainTitleField,
  Page,
  Preview,
  PreviewImage,
  SubmitButton,
  Subtitle,
  Thumbnail,
  ThumbnailImage,
  ThumbnailsRow,
  Title,
} from "./DocumentEditor.styles";

const buildInitialPage = (imageUrl, pageNumber) => ({
  imageUrl,
  pageNumber,
  pageTitle: `Page ${pageNumber}`,
  description: "",
});

const DocumentEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.uploadedFile || null;
  const createdObjectUrlsRef = useRef([]);

  const [mainTitle, setMainTitle] = useState("");
  const [pages, setPages] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const activePage = pages[activePageIndex] || null;

  const clearObjectUrls = () => {
    createdObjectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    createdObjectUrlsRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearObjectUrls();
    };
  }, []);

  useEffect(() => {
    const extractPages = async () => {
      if (!file) {
        return;
      }

      clearObjectUrls();
      setError("");
      setPages([]);
      setActivePageIndex(0);
      setMainTitle(file.name.replace(/\.[^/.]+$/, ""));
      setIsExtracting(true);

      try {
        const fileNameLower = file.name.toLowerCase();
        const isPdf =
          file.type === "application/pdf" || fileNameLower.endsWith(".pdf");

        if (isPdf) {
          const pdfjsLib = await import("pdfjs-dist");
          const pdfWorkerSrc = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url"))
            .default;
          pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

          const data = await file.arrayBuffer();
          const pdfDocument = await pdfjsLib.getDocument({ data }).promise;
          const extractedPages = [];

          for (let pageIndex = 1; pageIndex <= pdfDocument.numPages; pageIndex += 1) {
            const page = await pdfDocument.getPage(pageIndex);
            const viewport = page.getViewport({ scale: 1.3 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) {
              throw new Error("Failed to initialize canvas rendering context.");
            }

            canvas.width = Math.floor(viewport.width);
            canvas.height = Math.floor(viewport.height);

            await page.render({
              canvasContext: context,
              viewport,
            }).promise;

            const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
            extractedPages.push(buildInitialPage(imageUrl, pageIndex));
          }

          setPages(extractedPages);
          return;
        }

        if (file.type.startsWith("image/")) {
          const imageUrl = URL.createObjectURL(file);
          createdObjectUrlsRef.current.push(imageUrl);
          setPages([buildInitialPage(imageUrl, 1)]);
          return;
        }

        setError("Unsupported file format. Please upload PDF, PNG, JPG, or JPEG.");
      } catch (extractError) {
        setError(extractError.message || "Failed to process the uploaded file.");
      } finally {
        setIsExtracting(false);
      }
    };

    extractPages();
  }, [file]);

  const pageCounter = useMemo(() => {
    if (!pages.length) {
      return "PAGE 0 / 0";
    }
    return `PAGE ${activePageIndex + 1} / ${pages.length}`;
  }, [activePageIndex, pages.length]);

  const handlePageFieldChange = (field, value) => {
    setPages((prevPages) =>
      prevPages.map((page, index) =>
        index === activePageIndex ? { ...page, [field]: value } : page
      )
    );
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleSubmit = async () => {
    if (!pages.length || isExtracting) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        mainTitle,
        sourceFileName: file?.name || "",
        pages: pages.map((page, index) => ({
          pageNumber: page.pageNumber,
          pageTitle: page.pageTitle,
          description: page.description,
          imageData: page.imageUrl,
          isActive: index === activePageIndex,
        })),
      };

      // Ready for API integration.
      console.log("Document payload", payload);
      navigate("/", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Failed to submit document.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!file) {
    return (
      <Page>
        <Card>
          <Title>No Uploaded File Found</Title>
          <Subtitle>Please upload a file first and then click Proceed.</Subtitle>
          <ActionRow>
            <CancelButton type="button" onClick={handleCancel}>
              Back To Upload
            </CancelButton>
          </ActionRow>
        </Card>
      </Page>
    );
  }

  return (
    <Page>
      <Card>
        <BackButton type="button" onClick={handleCancel}>
          <ArrowLeft size={16} />
          Back
        </BackButton>

        <Label htmlFor="main-title">MAIN TITLE</Label>
        <MainTitleField
          id="main-title"
          value={mainTitle}
          onChange={(event) => setMainTitle(event.target.value)}
          placeholder="Enter document title"
        />

        <Preview>
          {isExtracting ? (
            <EmptyState>
              <Loader2 size={22} />
              Extracting PDF pages...
            </EmptyState>
          ) : activePage ? (
            <PreviewImage src={activePage.imageUrl} alt={`Page ${activePage.pageNumber}`} />
          ) : (
            <EmptyState>No page preview available.</EmptyState>
          )}
          <Badge>{pageCounter}</Badge>
        </Preview>

        <FormRow>
          <div>
            <Label htmlFor="page-title">PAGE TITLE</Label>
            <Input
              id="page-title"
              value={activePage?.pageTitle || ""}
              onChange={(event) => handlePageFieldChange("pageTitle", event.target.value)}
              placeholder="Enter page title"
              disabled={!activePage}
            />
          </div>
          <div>
            <Label htmlFor="description">DESCRIPTION</Label>
            <DescriptionField
              id="description"
              value={activePage?.description || ""}
              onChange={(event) => handlePageFieldChange("description", event.target.value)}
              placeholder="Enter page description"
              disabled={!activePage}
            />
          </div>
        </FormRow>

        <ThumbnailsRow>
          {pages.map((pageItem, index) => (
            <Thumbnail
              key={`${pageItem.pageNumber}-${index}`}
              type="button"
              onClick={() => setActivePageIndex(index)}
              $active={index === activePageIndex}
            >
              <ThumbnailImage
                src={pageItem.imageUrl}
                alt={`Thumbnail page ${pageItem.pageNumber}`}
              />
              <span>{pageItem.pageNumber}</span>
            </Thumbnail>
          ))}
        </ThumbnailsRow>

        <FooterActions>
          <CancelButton type="button" onClick={handleCancel}>
            Cancel
          </CancelButton>
          <SubmitButton
            type="button"
            disabled={isExtracting || isSubmitting || !pages.length}
            onClick={handleSubmit}
          >
            {isSubmitting ? <Loader2 size={16} /> : <Check size={16} />}
            {isSubmitting ? "Submitting..." : "Submit Changes"}
          </SubmitButton>
        </FooterActions>

        {error && <Subtitle>{error}</Subtitle>}
      </Card>
    </Page>
  );
};

export default DocumentEditor;
