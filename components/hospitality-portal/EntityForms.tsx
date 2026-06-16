/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Trash2, Building2 } from "lucide-react";
import EntityFormFields from "./EntityFormFields";
import {
  ENTITY_LABELS,
  ENTITY_TYPES,
  LOCAL_GOVERNMENTS,
} from "@/constants/createEntityConstants";

interface EntityFormProps {
  entity: any;
  index: number;
  entitiesCount: number;
  updateEntity: (id: any, field: string, value: any) => void;
  handleArrayChange: (
    id: any,
    field: string,
    option: string,
    checked: boolean,
  ) => void;
  handleOtherInputChange: (id: any, field: string, value: string) => void;
  removeEntity: (id: any) => void;
  errors: any;
  disabled?: boolean;
}

const EntityForm: React.FC<EntityFormProps> = ({
  entity,
  index,
  entitiesCount,
  updateEntity,
  handleArrayChange,
  handleOtherInputChange,
  removeEntity,
  errors,
  disabled = false,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
      {/* Entity Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e9e1d7]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00563b]/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#00563b]" />
          </div>
          <div>
            <h3 className="font-bold text-[#2a2523]">Entity #{index + 1}</h3>
            <p className="text-sm text-[#78716e]">
              {entity.businessName || "Unnamed Business"} •{" "}
              {ENTITY_LABELS[entity.entityType] || "Select Type"}
            </p>
          </div>
        </div>
        {entitiesCount > 1 && (
          <button
            onClick={() => removeEntity(entity.id)}
            disabled={disabled}
            className={`p-2 ${disabled ? "text-gray-400 cursor-not-allowed" : "text-[#dc2626] hover:bg-[#dc2626]/10"} rounded-lg transition-colors`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Entity Type */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Entity Type *
          </label>
          <select
            value={entity.entityType}
            disabled={disabled}
            onChange={(e: any) =>
              updateEntity(entity.id, "entityType", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-entityType`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
          >
            <option value="">Select Type</option>
            {ENTITY_TYPES.map((type) => (
              <option key={type} value={type}>
                {ENTITY_LABELS[type]}
              </option>
            ))}
          </select>
          {errors[`${entity.id}-entityType`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-entityType`]}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={entity.businessName}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "businessName", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-businessName`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter business name"
          />
          {errors[`${entity.id}-businessName`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-businessName`]}
            </p>
          )}
        </div>

        {/* Business Phone */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Business Phone *
            <span className="text-xs text-[#78716e] ml-1">
              (Phone number for contact purposes)
            </span>
          </label>
          <input
            type="tel"
            value={entity.businessPhoneNumber}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "businessPhoneNumber", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-businessPhoneNumber`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="08012345678"
          />
          {errors[`${entity.id}-businessPhoneNumber`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-businessPhoneNumber`]}
            </p>
          )}
        </div>

        {/* Local Government */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Local Government *
          </label>
          <select
            value={entity.localGovernment}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "localGovernment", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-localGovernment`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
          >
            <option value="">Select LGA</option>
            {LOCAL_GOVERNMENTS.map((lg) => (
              <option key={lg} value={lg}>
                {lg}
              </option>
            ))}
          </select>
          {errors[`${entity.id}-localGovernment`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-localGovernment`]}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Address *
          </label>
          <input
            type="text"
            value={entity.address}
            disabled={disabled}
            onChange={(e) => updateEntity(entity.id, "address", e.target.value)}
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-address`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Enter full address"
          />
          {errors[`${entity.id}-address`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-address`]}
            </p>
          )}
        </div>

        {/* Year Established */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Year Established *
          </label>
          <input
            type="number"
            value={entity.yearEstablished}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "yearEstablished", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-yearEstablished`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            min="1900"
            max={new Date().getFullYear()}
          />
          {errors[`${entity.id}-yearEstablished`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-yearEstablished`]}
            </p>
          )}
        </div>

        {/* Contact Name */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Contact Name *
          </label>
          <input
            type="text"
            value={entity.contactName}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "contactName", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-contactName`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="Contact person name"
          />
          {errors[`${entity.id}-contactName`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-contactName`]}
            </p>
          )}
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Contact Phone *
          </label>
          <input
            type="tel"
            value={entity.contactPhoneNumber}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "contactPhoneNumber", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-contactPhoneNumber`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="08012345678"
          />
          {errors[`${entity.id}-contactPhoneNumber`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-contactPhoneNumber`]}
            </p>
          )}
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Contact Email *
          </label>
          <input
            type="email"
            value={entity.contactEmail}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "contactEmail", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-contactEmail`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="contact@example.com"
          />
          {errors[`${entity.id}-contactEmail`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-contactEmail`]}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label className="block text-sm font-medium text-[#2a2523] mb-2">
            Business Email *
            <span className="text-xs text-[#78716e] ml-1">
              (This email will be used for official communication)
            </span>
          </label>
          <input
            type="email"
            value={entity.businessEmail}
            disabled={disabled}
            onChange={(e) =>
              updateEntity(entity.id, "businessEmail", e.target.value)
            }
            className={`w-full text-black px-3 py-2 border ${
              errors[`${entity.id}-businessEmail`]
                ? "border-red-500"
                : "border-[#e9e1d7]"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
            placeholder="business@example.com"
          />
          {errors[`${entity.id}-businessEmail`] && (
            <p className="text-xs text-red-500 mt-1">
              {errors[`${entity.id}-businessEmail`]}
            </p>
          )}
        </div>

        {/* Website checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={entity.hasWebsite}
            disabled={disabled}
            onChange={(e: any) =>
              updateEntity(entity.id, "hasWebsite", e.target.checked)
            }
            className="w-4 h-4 text-[#00563b] border-[#e9e1d7] rounded focus:ring-[#00563b]"
            id={`hasWebsite-${entity.id}`}
          />
          <label
            htmlFor={`hasWebsite-${entity.id}`}
            className="text-sm text-[#2a2523] cursor-pointer"
          >
            Do you have a business website?
          </label>
        </div>

        {/* Website URL */}
        {entity.hasWebsite && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#2a2523] mb-2">
              Business Website URL *
            </label>
            <input
              type="url"
              value={entity.website}
              disabled={disabled}
              onChange={(e) =>
                updateEntity(entity.id, "website", e.target.value)
              }
              className={`w-full text-black px-3 py-2 border ${
                errors[`${entity.id}-website`]
                  ? "border-red-500"
                  : "border-[#e9e1d7]"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] disabled:bg-gray-50 disabled:cursor-not-allowed`}
              placeholder="https://example.com"
            />
            {errors[`${entity.id}-website`] && (
              <p className="text-xs text-red-500 mt-1">
                {errors[`${entity.id}-website`]}
              </p>
            )}
          </div>
        )}

        {/* Entity-specific fields */}
        <EntityFormFields
          entity={entity}
          updateEntity={updateEntity}
          handleArrayChange={handleArrayChange}
          handleOtherInputChange={handleOtherInputChange}
          errors={errors}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default EntityForm;
