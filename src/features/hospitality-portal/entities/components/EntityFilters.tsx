import { useEffect, useState } from "react";
import styled from "styled-components";
import { Search } from "lucide-react";
import { Input, Select } from "@/shared/ui";
import { useDebounce } from "@/shared/hooks";
import { media } from "@/theme";
import { ENTITY_TYPES, ENTITY_TYPE_LABELS, REGISTRATION_STATUSES } from "@/shared/content";

export interface EntityFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  registrationStatus: string;
  onRegistrationStatusChange: (value: string) => void;
  entityType: string;
  onEntityTypeChange: (value: string) => void;
}

const FILTERABLE_STATUSES = REGISTRATION_STATUSES.filter((status) => status !== "Draft");

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.25rem;

  ${media.md} {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 0.75rem;
  color: ${({ theme }) => theme.colors.muted.foreground};
  pointer-events: none;
`;

export const EntityFilters = ({
  search,
  onSearchChange,
  registrationStatus,
  onRegistrationStatusChange,
  entityType,
  onEntityTypeChange,
}: EntityFiltersProps) => {
  const [rawSearch, setRawSearch] = useState(search);
  const debouncedSearch = useDebounce(rawSearch, 400);

  useEffect(() => {
    onSearchChange(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <Wrapper>
      <SearchWrapper>
        <SearchIcon size={16} />
        <Input
          style={{ paddingLeft: "2.25rem" }}
          placeholder="Search by business name or unique ID…"
          value={rawSearch}
          onChange={(event) => setRawSearch(event.target.value)}
        />
      </SearchWrapper>

      <Select
        value={registrationStatus}
        onChange={(event) => onRegistrationStatusChange(event.target.value)}
        aria-label="Filter by registration status"
      >
        <option value="">All statuses</option>
        {FILTERABLE_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>

      <Select
        value={entityType}
        onChange={(event) => onEntityTypeChange(event.target.value)}
        aria-label="Filter by entity type"
      >
        <option value="">All types</option>
        {ENTITY_TYPES.map((type) => (
          <option key={type} value={type}>
            {ENTITY_TYPE_LABELS[type]}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};
