/* eslint-disable @typescript-eslint/no-explicit-any */
import { FACILITY_OPTIONS, SERVICE_TYPE_OPTIONS } from '@/constants/createEntityConstants';
import React from 'react';

interface EntityFormFieldsProps {
  entity: any;
  updateEntity: (id: string, field: string, value: any) => void;
  handleArrayChange: (id: string, field: string, option: string, checked: boolean) => void;
  handleOtherInputChange: (id: string, field: string, value: string) => void;
  errors: any;
}

const EntityFormFields: React.FC<EntityFormFieldsProps> = ({
  entity,
  updateEntity,
  handleArrayChange,
  handleOtherInputChange,
  errors,
}) => {
  const getEntitySpecificFields = () => {
    switch (entity.entityType) {
      case 'hotel':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Room Count *
              </label>
              <input
                type="number"
                value={entity.roomCount}
                onChange={(e) => updateEntity(entity.id, 'roomCount', e.target.value)}
                className={`w-full text-black px-3 py-2 border ${
                  errors[`${entity.id}-roomCount`] ? 'border-red-500' : 'border-[#e9e1d7]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]`}
                min="1"
                placeholder="Number of rooms"
              />
              {errors[`${entity.id}-roomCount`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`${entity.id}-roomCount`]}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Bed Spaces *
              </label>
              <input
                type="number"
                value={entity.bedSpaces}
                onChange={(e) => updateEntity(entity.id, 'bedSpaces', e.target.value)}
                className={`w-full text-black px-3 py-2 border ${
                  errors[`${entity.id}-bedSpaces`] ? 'border-red-500' : 'border-[#e9e1d7]'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]`}
                min="1"
                placeholder="Total bed spaces"
              />
              {errors[`${entity.id}-bedSpaces`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`${entity.id}-bedSpaces`]}</p>
              )}
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Available Facilities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {FACILITY_OPTIONS.map((facility) => (
                  <label
                    key={facility}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-[#e9e1d7] hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={entity.facilities?.includes(facility) || false}
                      onChange={(e) => handleArrayChange(entity.id, 'facilities', facility, e.target.checked)}
                      className="w-4 h-4 text-[#00563b] border-[#e9e1d7] rounded focus:ring-[#00563b] cursor-pointer"
                    />
                    <span className="text-sm text-[#2a2523]">{facility}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Other Facilities
                </label>
                <input
                  type="text"
                  value={entity.facilitiesOther || ''}
                  onChange={(e) => handleOtherInputChange(entity.id, 'facilities', e.target.value)}
                  className="w-full px-3 text-black py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]"
                  placeholder="Specify other facilities (comma separated)"
                />
              </div>
            </div>
          </>
        );

      case 'restaurant':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Seating Capacity *
              </label>
              <input
                type="number"
                value={entity.seatingCapacity}
                onChange={(e) => updateEntity(entity.id, 'seatingCapacity', e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors[`${entity.id}-seatingCapacity`] ? 'border-red-500' : 'border-[#e9e1d7]'
                } rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#00563b]`}
                min="1"
                placeholder="Number of seats"
              />
              {errors[`${entity.id}-seatingCapacity`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`${entity.id}-seatingCapacity`]}</p>
              )}
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Service Types
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SERVICE_TYPE_OPTIONS.map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-[#e9e1d7] hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={entity.serviceTypes?.includes(service) || false}
                      onChange={(e) => handleArrayChange(entity.id, 'serviceTypes', service, e.target.checked)}
                      className="w-4 h-4 text-[#00563b] border-[#e9e1d7] rounded focus:ring-[#00563b] cursor-pointer"
                    />
                    <span className="text-sm text-[#2a2523]">{service}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Other Service Types
                </label>
                <input
                  type="text"
                  value={entity.serviceTypesOther || ''}
                  onChange={(e) => handleOtherInputChange(entity.id, 'serviceTypes', e.target.value)}
                  className="w-full text-black px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]"
                  placeholder="Specify other service types (comma separated)"
                />
              </div>
            </div>
          </>
        );

      case 'bar':
      case 'lounge':
        return (
          <>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Service Types
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Continental dishes', 'Local dishes', 'Inter-continental dishes'].map((service) => (
                  <label
                    key={service}
                    className="flex items-center space-x-2 p-3 rounded-lg border border-[#e9e1d7] hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={entity.serviceTypes?.includes(service) || false}
                      onChange={(e) => handleArrayChange(entity.id, 'serviceTypes', service, e.target.checked)}
                      className="w-4 h-4 text-[#00563b] border-[#e9e1d7] rounded focus:ring-[#00563b] cursor-pointer"
                    />
                    <span className="text-sm text-[#2a2523]">{service}</span>
                  </label>
                ))}
              </div>
               <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Seating Capacity *
              </label>
              <input
                type="number"
                value={entity.seatingCapacity}
                onChange={(e) => updateEntity(entity.id, 'seatingCapacity', e.target.value)}
                className={`w-full px-3 py-2 border ${
                  errors[`${entity.id}-seatingCapacity`] ? 'border-red-500' : 'border-[#e9e1d7]'
                } rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#00563b]`}
                min="1"
                placeholder="Number of seats"
              />
              {errors[`${entity.id}-seatingCapacity`] && (
                <p className="text-xs text-red-500 mt-1">{errors[`${entity.id}-seatingCapacity`]}</p>
              )}
            </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Other Service Types
                </label>
                <input
                  type="text"
                  value={entity.serviceTypesOther || ''}
                  onChange={(e) => handleOtherInputChange(entity.id, 'serviceTypes', e.target.value)}
                  className="w-full text-black px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]"
                  placeholder="Specify other service types (comma separated)"
                />
              </div>
            </div>
          </>
        );

      case 'tour_operator':
      case 'travel_agent':
      case 'hospitality_org':
      case 'other':
        return (
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-[#2a2523] mb-2">
              Description
            </label>
            <textarea
              value={entity.description || ''}
              onChange={(e) => updateEntity(entity.id, 'description', e.target.value)}
              className="w-full text-black px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b]"
              rows={3}
              placeholder="Provide additional details about your business"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return getEntitySpecificFields();
};

export default EntityFormFields;