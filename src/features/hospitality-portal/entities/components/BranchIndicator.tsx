import { Link } from "react-router-dom";
import styled from "styled-components";
import { GitBranch } from "lucide-react";
import { Badge } from "@/shared/ui";
import type { EstablishmentParent } from "../types";

export interface BranchIndicatorProps {
  parent: EstablishmentParent;
}

const Wrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.info.DEFAULT};

  &:hover {
    text-decoration: underline;
  }
`;

/** Shown on a branch row/page to make the parent relationship visible — a
 * branch is its own licensable entity (own id, own uniqueBusinessId,
 * approved/rejected independently) but is still presented as part of the
 * parent it belongs to. */
export const BranchIndicator = ({ parent }: BranchIndicatorProps) => (
  <Wrapper
    to={`/hospitality-portal/entities/${parent.id}`}
    onClick={(event) => event.stopPropagation()}
  >
    <GitBranch size={12} />
    Branch of {parent.businessName ?? "parent business"}
  </Wrapper>
);

/** A compact "Branch" tag for table rows, independent of the link above. */
export const BranchTag = () => <Badge variant="info">Branch</Badge>;
