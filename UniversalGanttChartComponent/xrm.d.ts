export namespace Xrm {
  namespace EntityMetadata {
    interface AttributesCollection {
      getByName(name: string): OptionSetMetadata;
    }

    interface OptionSetMetadata {
      attributeDescriptor: OptionSetAttributeDescriptor;
    }

    interface OptionSetAttributeDescriptor {
      Id: { guid: string };
      OptionSetId: string;
      OptionSet: OptionMetadata[];
    }

    interface OptionMetadata {
      Label: string;
      Value: number;
      Color: string;
    }
  }
}
