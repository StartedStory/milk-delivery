const MilkDeliveryContract = artifacts.require("MilkDelivery");

contract("MilkDeliveryContract", function (accounts) {
  let contractInstance;
  let newVendor;
  beforeEach(async() => {
    contractInstance = await MilkDeliveryContract.deployed();
    [owner, alice, bob, vendor1, vendor2, vendor3] = accounts;
    newVendor = {
          address: vendor1,
          milkFactory: "Milk Burgers",
          name:"John Doe", 
          email: "john@milk.burgers.com"
      };
  });
  describe("deployment", function () {
    it("should deploy successfully", async() => {
      assert(contractInstance,"milk delivery contract deployed successfully");
    });
  });

  describe("Vendor functionalities", async() => {
    it("should enable the contract owner to add a new vendor", async() => {
      const result = await contractInstance.addNewVendor(
        newVendor.address,
        newVendor.milkFactory, 
        newVendor.name, 
        newVendor.email,
        {from: owner}
        );

      const totalVendors = await contractInstance.totalVendors();
      const isListed = await contractInstance.isVendorListed(vendor1);
      assert.equal(totalVendors, 1);
      assert.equal(isListed, true);;
      assert.equal(result.logs[0].args.vendor, vendor1);
      assert.equal(result.logs[0].args.addedBy, owner);
    }); 

    it("should enable the contract owner to approve a new vendor for recording milk deliveries", async () => {
      const result = await contractInstance.approveVendor(vendor1);

    });
  });

  describe("Milk delivery", async() => {
    it("should successfully enable a vendor to record a new delivery item", async() => {
        
    });
  });
});