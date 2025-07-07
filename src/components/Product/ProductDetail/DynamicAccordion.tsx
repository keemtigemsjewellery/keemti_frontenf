import Accordion from "react-bootstrap/Accordion";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";

interface DynamicAccordionModal {
  title: string;
  details: string | null;
  accordionIndex: string;
  loading: boolean;
}

const DynamicAccordion = ({
  title,
  details,
  accordionIndex,
  loading,
}: DynamicAccordionModal) => {
  const clean = (html: string) => DOMPurify.sanitize(html);

  return (
    <section className="section-space standout-sec pt-4 pt-md-3 pb-0">
      <div className="container">
        <div className="white-bg white-boxbg">
          {!loading && (
            <Accordion defaultActiveKey={[`${accordionIndex}`]} alwaysOpen>
              <Accordion.Item eventKey={accordionIndex}>
                <Accordion.Header>
                  <h5>{title}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  {details && parse(clean(details))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          )}

          {loading && (
            <>
              <Skeleton count={1} />
              <Skeleton count={1} />
              <Skeleton count={1} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DynamicAccordion;
