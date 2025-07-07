import Accordion from "react-bootstrap/Accordion";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";

interface DynamicAccordionModal {
  title: string;
  accordionIndex: string;
  loading: boolean;
}

const JewellaryAccordion = ({
  title,
  accordionIndex,
  loading,
}: DynamicAccordionModal) => {
  const clean = (html: string) => DOMPurify.sanitize(html);

  return (
    <section className="section-space  standout-sec pt-4 pt-md-3 pb-0">
      <div className="container">
        <div className="white-bg white-boxbg">
          {!loading && (
            <Accordion defaultActiveKey={[`${accordionIndex}`]} alwaysOpen>
              <Accordion.Item eventKey={accordionIndex}>
                <Accordion.Header>
                  <h5>{title}</h5>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="jewellery-care">
                    <div className="section d-flex mt-2">
                      <div className="left">
                        <i className="fal fa-sun"></i>
                      </div>
                      <div className="ms-3">
                        <h6>Take care of light and heat</h6>
                        <p>
                          Prolonged exposure to light and heat can have a
                          negative effect on your jewellery. Certain gemstones
                          are especially vulnerable to heat, while other jewels
                          might bleach under the sun.
                        </p>
                      </div>
                    </div>
                    <div className="section d-flex">
                      <div className="left">
                        <i className="fas fa-water"></i>
                      </div>
                      <div className="ms-3">
                        <h6>Stay away from chemicals</h6>
                        <p>
                          Even daily chemicals such as hairspray, perfume,
                          cosmetics and more can discolour precious metals, such
                          as gold, silver and platinum. They can also damage
                          other items such as pearls.
                        </p>
                      </div>
                    </div>
                    <div className="section d-flex">
                      <div className="left">
                        <i className="fas fa-hand-receiving"></i>
                      </div>
                      <div className="ms-3">
                        <h6>Store Them Carefully</h6>
                        <p>
                          Diamonds need to be protected not only against getting
                          lost or being stolen, but also against damage. When a
                          diamond rubs against another diamond, the gemstones
                          can scratch each other.
                        </p>
                      </div>
                    </div>
                  </div>
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

export default JewellaryAccordion;
